from django.db import models
from django.contrib.auth.models import User

class WeekDay(models.TextChoices):
    SUNDAY = 'Sun' 
    MONDAY = 'Mon' 
    TUESDAY = 'Tue' 
    WEDNESDAY = 'Wed' 
    THURSDAY = 'Thu' 
    FRIDAY = 'Fri' 
    SATURDAY = 'Sat' 

class Subjects(models.TextChoices):
    MATHEMATICS = 'Math'
    PHYSICS = 'Phys'
    CHEMISTRY = 'Chem'
    BIOLOGY = 'Bio'
    PORTUGUESE = 'Port' 
    ENGLISH = 'Eng' 
    HISTORY = 'Hist' 
    GEOGRAPHY = 'Geo' 
    PHILOSOPHY = 'Phi' 
    SOCIOLOGY = 'Soc' 

class Routine(models.Model):
    routines_user = models.CharField(max_length=32, primary_key=True) 

    available_time = models.IntegerField(default=0)
    
    # Both subject related fields must recieve the subjects as comma separated 
    # values encoded exactly as defined in the  IntegerChoices subclass Subjects
    difficult_subjects = models.TextField()
    easy_subjects = models.TextField()

class StudyTimeBlock(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    week_day = models.TextField(choices=WeekDay.choices)
    start_hour = models.IntegerField()
    allocated_time = models.IntegerField()
    subject = models.TextField(choices=Subjects.choices)

    def to_dictionary(self):
        return {
            'weekDay': self.week_day,
            'startHour': self.start_hour,
            'allocatedTime': self.allocated_time,
            'subject': self.subject
        }

    def __str__(self):
        return 'week_day: ' + str(self.week_day)\
            + '; start_hour: ' + str(self.start_hour)\
            + '; allocated_time: ' + str(self.allocated_time)\
            + '; subject: ' + self.subject