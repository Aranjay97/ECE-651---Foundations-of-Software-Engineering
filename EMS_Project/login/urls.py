from django.urls import path
from login import views 
 
urlpatterns = [ 
    path('login_employee', views.login_employee, name='login_employee'),
    path('add_employee', views.add_employee, name='add'),
    path('changeEmpPwd/<str:pk>/', views.changeEmpPwd,name='change'),
    path('attendance_in', views.attendance_in,name='in'),
    path('attendance_out', views.attendance_out,name='out'),
    path('getAttendanceDetails', views.getAttendanceDetails,name='get'),
    path('updatePersonalDetails/<str:pk>/', views.updatePersonalDetails,name='updatePersonalDetails'),
    path('updateWorkDetails/<str:pk>/', views.updateWorkDetails,name='updateWorkDetails'),
    path('add_holidays', views.add_holidays, name='add_holidays'),
    path('get_all_employees', views.get_all_employees, name='get_all_employees'),
    path('get_all_employee_IDs', views.get_all_employee_IDs,name='get_all_employee_IDs'),
    path('payroll_month', views.payroll_month, name='payroll_month'),
    path('addStaticLeaveDetails', views.addStaticLeaveDetails,name='addStaticLeaveDetails'), 
    path('saveLeaveDetails', views.saveLeaveDetails, name='saveLeaveDetails'),
    path('getPayrollDetails', views.getPayrollDetails,name='getPayrollDetails'),
    path('getLeaveDetails', views.getLeaveDetails,name='getLeaveDetails'),
    path('getAppliedLeaveDetails', views.getAppliedLeaveDetails,name='getAppliedLeaveDetails')
]