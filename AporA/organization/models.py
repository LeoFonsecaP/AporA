from django.db import models

class WeekDay(models.IntegerChoices):
    SUNDAY = 0
    MONDAY = 1
    THUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6

class Subjects(models.IntegerChoices):
    MATHEMATICS = 0
    PHYSICS = 1
    CHEMISTRY = 2
    BIOLOGY = 3
    PORTUGUESE = 4
    ENGLISH = 5
    HISTORY = 6
    GEOGRAPHY = 7
    PHILOSOPHY = 8
    SOCIOLOGY = 9

# When querying for an instance of this model in the data base, execute a 
# reverse filter on instances of StudyTimeBlock
class Routine(models.Model):
    routines_user = models.TextField(max_length=32, unique=True) 
    available_time_in_the_week = models.IntegerField()

    # Both subject related fields must recieve the subjects as comma separated 
    # values encoded exactly as defined in the  IntegerChoices subclass Subjects
    difficult_subjects = models.TextField()
    easy_subjects = models.TextField()

#class StudyTimeBlock(models.Model):
    #routine_container = models.ForeignKey(
        #'Routine', on_delete=models.CASCADE, related_name='STUDY_BLOCKS'
    #)
    #week_day = models.IntegerChoices(choices=WeekDay.choices)
    #start_hour = models.IntegerField()
    #allocatedTime = models.IntegerField()
    #subject = models.IntegerChoices(choices=Subjects.choices)