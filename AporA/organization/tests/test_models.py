from django.test import TestCase
from organization.models import Routine

class ModelsTest(TestCase):
    def test_if_new_routine_gets_added(self):
        new_routine = Routine(
            username='abcd', time_available_in_the_week=15, 
            difficult_subjects='Hist, Geo', easy_subjects='Math, Phys'
        )
        new_routine.save()
        self.assertEquals(new_routine, Routine.objects.filter(username='abcd'))