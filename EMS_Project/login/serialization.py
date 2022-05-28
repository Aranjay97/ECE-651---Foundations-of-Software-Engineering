from dataclasses import fields
from functools import partial
from operator import mod
import py_compile
from rest_framework import serializers
from login.models import leave_available, employee,work_details, attendance_status, holidays_available, Paystubs_Services, leave_details

class SerializationClass(serializers.ModelSerializer):
    class Meta:
        model= employee
        fields= '__all__'
    
class SerializationClass1(serializers.ModelSerializer):
    # Employee = serializers.PrimaryKeyRelatedField(source='employee.Employee_id' ,  read_only=True, queryset=employee.objects.all(), many=False)
    Employee = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model= work_details
        fields= ['Employee','Designation','Date_of_Joining','CTC', 'Department', 'Employee_Status','Reporting_To','Employee_Type','Work_Phone']

class SerializationClass2(serializers.ModelSerializer):
    class Meta:
        model= attendance_status
        fields= '__all__'

class SerializationClassHolidays(serializers.ModelSerializer):
    class Meta:
        model= holidays_available
        fields= '__all__'  

class SerializationClassPayroll(serializers.ModelSerializer):
    class Meta:
        model= Paystubs_Services
        fields= '__all__'  


class SerializationClassLeaveStatic(serializers.ModelSerializer):
    class Meta:
        model= leave_available
        fields= ['Employee','Casual_Available', 'Sick_Available' ]
    
    def create(self, validated_data):
        empID = validated_data.pop('Employee')
        leave_instance = leave_available.objects.create(Employee=empID, **validated_data)
        return leave_instance

class SerializationClassApplyLeave(serializers.ModelSerializer):
    class Meta:
        model= leave_details
        fields= ['Employee', 'Leave_Reason', 'Leave_Type', 'From_Date', 'To_Date', 'Status']

    def create(self, validated_data):
        empID = validated_data.pop('Employee')
        applyleave_instance = leave_details.objects.create(Employee=empID, **validated_data)
        return applyleave_instance