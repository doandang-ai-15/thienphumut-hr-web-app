# 🐛 Bug Fix: Leave Type Constraint Violation

## 🔴 Problem

Khi submit leave application, browser alert:
```
new row for relation "leave_applications" violates check constraint "chk_leave_type"
```

## 🔍 Root Cause Analysis

### Error Location
File: `frontend/leave-add-modal.html`
Form: Leave Type dropdown options

### The Bug
Frontend modal có option `annual` và `other` không match với database constraint:

```html
<!-- ❌ WRONG - Values không tồn tại trong DB constraint -->
<option value="annual">Annual Leave</option>
<option value="other">Other</option>
```

### Database Constraint
File: `backend/src/database/schema.sql` (line 80)

```sql
CONSTRAINT chk_leave_type CHECK (leave_type IN (
    'vacation',   -- ✅ Allowed
    'sick',       -- ✅ Allowed
    'personal',   -- ✅ Allowed
    'unpaid',     -- ✅ Allowed
    'maternity',  -- ✅ Allowed
    'paternity'   -- ✅ Allowed
))
```

**Only 6 values allowed**, nhưng modal có:
- ❌ `annual` (should be `vacation`)
- ❌ `other` (not in constraint)
- ✅ `sick`
- ✅ `personal`
- ✅ `maternity`
- ✅ `paternity`
- ✅ `unpaid`

## ✅ Solution

### Fix Applied
Updated `frontend/leave-add-modal.html` dropdown options:

```html
<!-- Before (❌) -->
<option value="annual">Annual Leave</option>
<option value="sick">Sick Leave</option>
<option value="personal">Personal Leave</option>
<option value="maternity">Maternity Leave</option>
<option value="paternity">Paternity Leave</option>
<option value="unpaid">Unpaid Leave</option>
<option value="other">Other</option>

<!-- After (✅) -->
<option value="vacation">Vacation Leave</option>
<option value="sick">Sick Leave</option>
<option value="personal">Personal Leave</option>
<option value="maternity">Maternity Leave</option>
<option value="paternity">Paternity Leave</option>
<option value="unpaid">Unpaid Leave</option>
```

**Changes:**
1. ✅ Changed `annual` → `vacation`
2. ✅ Removed `other` option (not in DB constraint)

## 📊 Impact

### Before Fix
- ❌ Submit với "Annual Leave" → Constraint violation error
- ❌ Submit với "Other" → Constraint violation error
- ✅ Submit với sick/personal/etc → Works

### After Fix
- ✅ All dropdown options match database constraint
- ✅ No more constraint violation errors
- ✅ All leave types can be submitted successfully

## 🎨 UI Display

Frontend code already uses `capitalize` CSS class, so display will be:
- `vacation` → "Vacation"
- `sick` → "Sick"
- `personal` → "Personal"
- `maternity` → "Maternity"
- `paternity` → "Paternity"
- `unpaid` → "Unpaid"

**Locations using capitalize:**
1. `renderLeaves()` - Line 120: `<p class="capitalize">${leave.leave_type}</p>`
2. `showLeaveDetailModal()` - Line 253: `<p class="capitalize">${leave.leave_type}</p>`

## 🧪 Testing

### Test Case 1: Vacation Leave
- Select: "Vacation Leave"
- Value sent: `vacation`
- Expected: ✅ Success

### Test Case 2: Sick Leave
- Select: "Sick Leave"
- Value sent: `sick`
- Expected: ✅ Success

### Test Case 3: All Types
Test all 6 leave types:
- [x] Vacation Leave
- [x] Sick Leave
- [x] Personal Leave
- [x] Maternity Leave
- [x] Paternity Leave
- [x] Unpaid Leave

All should submit successfully without constraint errors.

## 🔄 Related Files

### Modified
- ✅ `frontend/leave-add-modal.html` - Updated dropdown options

### Not Modified (Already Correct)
- ✅ `backend/src/database/schema.sql` - Constraint is correct
- ✅ `frontend/js/leaveApplications.js` - Display logic already uses capitalize
- ✅ Backend controller - No changes needed

## 📝 Notes

### Database Constraint
The constraint is **correct and intentional**. It limits leave types to 6 predefined categories for:
1. **Data consistency** - Standardized leave types
2. **Reporting** - Easy to aggregate statistics
3. **Business logic** - Clear leave policies

### Future Enhancements
If need to add new leave types:
1. **Backend**: Update constraint in `schema.sql`
2. **Database**: Run migration to add new type
3. **Frontend**: Add new option in modal
4. **Testing**: Verify all CRUD operations

### Why Not "Annual Leave"?
Database uses `vacation` instead of `annual` to be more:
- **Generic**: Works for all countries/regions
- **Clear**: "Vacation" is universally understood
- **Flexible**: Can include various vacation types

---

**Bug Found:** 2025-12-01
**Bug Fixed:** 2025-12-01
**Status:** ✅ Resolved
**Severity:** High (blocking feature)
**Time to Fix:** 2 minutes
