from django.test import TestCase
from organization.models import Routine
from organization.models import Subjects
from organization.models import WeekDay
from organization.models import StudyTimeBlock

class ModelsTest(TestCase):
    def test_if_new_routines_user_gets_properly_stored(self):
        DIFFICULT_TEST_SUBJECTS = 'Historia, Geografia'
        EASY_TEST_SUBJECTS = 'Matematica, Fisica'
        AVAILABLE_TIME = 15
        new_routine = Routine(
            routines_user='abcd',
            difficult_subjects=DIFFICULT_TEST_SUBJECTS,
            easy_subjects=EASY_TEST_SUBJECTS,
            available_time=AVAILABLE_TIME,
        )
        new_routine.save()
        queryed_routine = Routine.objects.all()[0]
        self.assertEquals(new_routine, queryed_routine)
    
    def test_querie_by_primary_key_with_ten_routine_isntances(self):
        users = ['ab', 'cd', 'ef', 'gh', 'ij', 'kl', 'mn', 'pq', 'rs', 'tu']
        new_routines = []
        
        for i in range(len(users)):
            new_routines.append(Routine(routines_user=users[i]))
            new_routines[i].save()

        INDEX_OF_QUERIED_ELEMENT = 8
        recieved_querie_set = Routine.objects.get(
            routines_user=users[INDEX_OF_QUERIED_ELEMENT]
        )
        self.assertEquals(
            new_routines[INDEX_OF_QUERIED_ELEMENT], recieved_querie_set
        )

    def test_if_study_time_block_gets_properly_stored(self):
        SUBJECT = Subjects.MATHEMATICS
        WEEK_DAY = WeekDay.WEDNESDAY
        START_HOUR = 15
        ALLOCATED_TIME = 1
        routine = Routine(routines_user='ab')
        routine.save()

        new_study_time_block = StudyTimeBlock(
            routine_container=routine,
            subject=SUBJECT, 
            week_day=WEEK_DAY, 
            start_hour=START_HOUR,
            allocated_time=ALLOCATED_TIME,
        )

        new_study_time_block.save()
        queryed_study_block = StudyTimeBlock.objects.all()[0]
        self.assertEquals(new_study_time_block, queryed_study_block)

    def test_if_study_time_blocks_get_properly_queried_by_routine_container(self):
        users = ['ab', 'cd', 'ef', 'gh', 'ij', 'kl', 'mn', 'pq', 'rs', 'tu']
        new_routines = []
        
        for i in range(10):
            new_routines.append(Routine(routines_user=users[i]))
            new_routines[i].save()

        time_blocks_for_first_user = []
        time_blocks_for_first_user.append(
            StudyTimeBlock(
                routine_container=new_routines[0], start_hour=8, allocated_time=2,
                subject=Subjects.MATHEMATICS, week_day=WeekDay.MONDAY,
            ) 
        )         
        time_blocks_for_first_user[0].save()

        time_blocks_for_first_user.append(
            StudyTimeBlock(
                routine_container=new_routines[0], start_hour=8, allocated_time=2,
                subject=Subjects.HISTORY, week_day=WeekDay.TUESDAY,
            ) 
        )         
        time_blocks_for_first_user[1].save()
        time_blocks_for_first_user.append(
            StudyTimeBlock(
                routine_container=new_routines[0], start_hour=8, allocated_time=2,
                subject=Subjects.HISTORY, week_day=WeekDay.TUESDAY,
            ) 
        )         
        time_blocks_for_first_user[2].save()

        time_blocks_for_second_user = []
        time_blocks_for_second_user.append(
            StudyTimeBlock(
                routine_container=new_routines[1], start_hour=12, allocated_time=4,
                subject=Subjects.PHILOSOPHY, week_day=WeekDay.MONDAY,
            ) 
        )         
        time_blocks_for_second_user[0].save()
        time_blocks_for_second_user.append(
            StudyTimeBlock(
                routine_container=new_routines[1], start_hour=12, allocated_time=4,
                subject=Subjects.PHYSICS, week_day=WeekDay.TUESDAY,
            ) 
        )         
        time_blocks_for_second_user[1].save()
        time_blocks_for_second_user.append(
            StudyTimeBlock(
                routine_container=new_routines[1], start_hour=12, allocated_time=4,
                subject=Subjects.PORTUGUESE, week_day=WeekDay.WEDNESDAY,
            ) 
        )         
        time_blocks_for_second_user[2].save()

        time_blocks_query_set = StudyTimeBlock.objects.filter(routine_container__routines_user='ab') 
        self.assertEquals(len(time_blocks_query_set), 3)
        self.assertEquals(
            next((time_block for time_block in time_blocks_query_set 
                if time_blocks_for_first_user[0] == time_block), None),
            time_blocks_for_first_user[0] 
        )
        self.assertEquals(
            next((time_block for time_block in time_blocks_query_set 
                if time_blocks_for_first_user[1] == time_block), None),
            time_blocks_for_first_user[1] 
        )
        self.assertEquals(
            next((time_block for time_block in time_blocks_query_set 
                if time_blocks_for_first_user[2] == time_block), None),
            time_blocks_for_first_user[2] 
        )