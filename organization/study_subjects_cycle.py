STRENGTHS_CYCLE_INDEXES = [6, 15]
WEEKNESSES_CYCLE_INDEXES = [0, 3, 7, 10, 13, 17, 20, 23]
NEUTRALS_CYCLE_INDEXES = [1, 2, 4, 5, 8, 9, 11, 12, 14, 15, 16, 18, 19, 21, 22]
SUBJECTS_IN_A_CYCLE = 24

class StudySubjectsCycle:
    def __init__(self, weaknesses, strengths, neutral_subjects):
        self.__weaknesses = weaknesses
        self.__strengths = strengths
        self.__neutral_subjects = neutral_subjects
        self.__cycle = [None for index in range(SUBJECTS_IN_A_CYCLE)]

        self.__add_strengths()
        self.__add_weaknesses()
        self.__add_neutral_subjects()

    def __add_weaknesses(self):
        for i in range(len(WEEKNESSES_CYCLE_INDEXES)):
            index = WEEKNESSES_CYCLE_INDEXES[i]
            self.__cycle[index] = self.__weaknesses[i % 2]

    def __add_strengths(self):
        self.__cycle[STRENGTHS_CYCLE_INDEXES[0]] = self.__strengths[0]
        self.__cycle[STRENGTHS_CYCLE_INDEXES[1]] = self.__strengths[1]
    
    def __add_neutral_subjects(self):
        length  = len(self.__neutral_subjects)
        for i in range(len(NEUTRALS_CYCLE_INDEXES)):
            index = NEUTRALS_CYCLE_INDEXES[i]
            self.__cycle[index] = self.__neutral_subjects[i % length]

    def get_cycle(self):
        return self.__cycle
