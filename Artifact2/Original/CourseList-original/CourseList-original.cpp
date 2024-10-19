//============================================================================
// Author      : Andrew Brown
// Date        : December 10, 2023
// Version     : 1.0
// Description : Vector Sorting Algorithms
//============================================================================

#include <iostream>
#include <fstream>
#include <string>
#include <algorithm>
#include <vector>

using namespace std;

// Setup Course strcture information
struct Course {
    string number;
    string name;
    vector<string> prerequisites;

    Course() {
        number = "";
        name = "";
    }

    Course(string aNumber, string aName, vector<string> thePrerequisites) {
        number = aNumber;
        name = aName;
        prerequisites = thePrerequisites;
    }

    Course(string aNumber, string aName) {
        number = aNumber;
        name = aName;
    }
};

class CourseList {
private:
    vector<Course> courseList;
    static bool courseSort(const Course& lhCourse, const Course& rhCourse);

public:
    CourseList();
    virtual ~CourseList();
    void addCourse(string number, string name);
    void addCourse(string number, string name, vector<string> prerequisites);
    void printCourses();
    Course searchCourses(string courseNumber);
};

CourseList::CourseList() {

}

CourseList::~CourseList() {

}

/**
 * Private method - Used for the sort method
 *
 * @param lhCourse - left side course structure to compare
 * @param rhCourse - right side course structure to compare
 */
bool CourseList::courseSort(const Course& lhCourse, const Course& rhCourse) {
    // return based on ascending order
    return lhCourse.number < rhCourse.number;
}

/**
 * Add a new course to the course list
 *
 * @param number - course number
 * @param name - course name
 */
void CourseList::addCourse(string number, string name) {
    courseList.push_back(Course(number, name));
}

/**
 * Add a new course to the course list
 *
 * @param number - course number
 * @param name - course name
 * @param prerequisites - vector of course prerequisites
 */
void CourseList::addCourse(string number, string name, vector<string> prerequisites) {
    courseList.push_back(Course(number, name, prerequisites));
}

/**
 * Print all courses in the courseList
 */
void CourseList::printCourses() {
    // sort the list in ascending order
    sort(courseList.begin(), courseList.end(), courseSort);

    // print the sorted courses
    for (int r = 0; r < courseList.size(); r++) {
        cout << courseList.at(r).number << ", " << courseList.at(r).name << endl;
    }
}

/**
 * Search the course list and return the Course if is exist
 *
 * @param courseNumber - number of the course to search for
 * @return Course if found, otherwise empty Course
 */
Course CourseList::searchCourses(string courseNumber) {
    Course emptyCourse;

    for (int r = 0; r < courseList.size(); r++) {
        if (courseList.at(r).number.compare(courseNumber) == 0) {
            return courseList.at(r);
        }
    }

    return emptyCourse;
}

/**
 * Split a string into multiple vector strings using a delimiter
 *
 * @param courseList - string to split
 * @return vector of split strings
 */
vector<string> splitCourseLine(string courseLine) {
    vector<string> courseDetails;
    int startPosition = 0, endPosition = 0;

    for (int i = 0; i <= courseLine.size(); i++) {
        if (courseLine[i] == ',' || i == courseLine.size()) {
            endPosition = i;
            string temp;
            temp.append(courseLine, startPosition, endPosition - startPosition);
            courseDetails.push_back(temp);
            startPosition = endPosition + 1;
        }
    }

    return courseDetails;
}


/**
 * Load a file containing courses into the Course structure
 *
 * @param courseListFile - the path to the file to load
 * @return true if file was successfully loaded and false if it was not
 */
bool loadCourses(string courseListFile, CourseList* courseList) {
    // Initialize variables
    ifstream courseFileHandle;
    string line;
    string courseName;
    string courseNum;

    // try opening the file
    courseFileHandle.open(courseListFile);

    // if file can't be open return false
    if (!courseFileHandle.is_open()) {
        return false;
    }

    // read each line in the file
    while (getline(courseFileHandle, line)) {
        // split at delimiter
        vector<string> courseDetails = splitCourseLine(line);

        // check that at lease 2 items exist in the line
        if (courseDetails.size() < 2) {
            return false;
        }

        // store the details of the course number and name and remove them from the list
        courseNum = courseDetails.at(0);
        courseName = courseDetails.at(1);

        courseDetails.erase(courseDetails.begin(), courseDetails.begin() + 2);

        // add the course to the course list
        courseList->addCourse(courseNum, courseName, courseDetails);
    }

    return true;
}

int main()
{
    // Initalize variables
    string courseListFile;
    int choice = 0;
    string courseLookup;
    Course courseDetails;
    string prerequisites;
    bool courseFileLoaded = false;
    CourseList* courseList = new CourseList();

    cout << "Welcome to the course planner." << endl;

    // Main menu loop 
    while (choice != 9) {
        // Print menu options and retrieve choice from the user
        cout << "  1. Load Data Structure" << endl;
        cout << "  2. Print Course List" << endl;
        cout << "  3. Print Course" << endl;
        cout << "  9. Exit" << endl << endl;
        cout << "What would you like to do? ";
        cin >> choice;

        // Check the user choice
        switch (choice) {
            // Load Course File
        case 1:
            // retrieve the filename from the user and load the courses from it
            cout << "What is the filename for the courses? ";
            cin >> courseListFile;
            if (loadCourses(courseListFile, courseList)) {
                courseFileLoaded = true;
                cout << "Courses were loaded." << endl;
            }
            else {
                cout << "Unable to read course file." << endl;
            }
            break;
            // Print all courses from the course list
        case 2:
            // check if the course file was already loaded and print all courses if it is
            if (!courseFileLoaded) {
                cout << "Courses were not loaded" << endl;
                break;
            }

            cout << "Here is a sample schedule:" << endl << endl;
            courseList->printCourses();
            cout << endl;
            break;
            // Search for a course
        case 3:
            // check if the course file was already loaded
            if (!courseFileLoaded) {
                cout << "Courses were not loaded" << endl;
                break;
            }

            // retrieve the course number from the user
            cout << "What course do you want to know about? ";
            cin >> courseLookup;

            // convert string to upper to search through list
            transform(courseLookup.begin(), courseLookup.end(), courseLookup.begin(), ::toupper);

            // search through the course list and check if it exists
            courseDetails = courseList->searchCourses(courseLookup);
            if (courseDetails.number.compare("") == 0) {
                cout << "Course does not exists" << endl;
                break;
            }

            // print the course number and name
            cout << courseDetails.number << ", " << courseDetails.name << endl;

            // loop through the prerequisites vector and print them out
            cout << "Prerequisites: ";
            prerequisites = "";
            for (int i = 0; i < courseDetails.prerequisites.size(); i++) {
                if (i > 0) {
                    prerequisites.append(", ");
                }

                prerequisites.append(courseDetails.prerequisites.at(i));
            }
            cout << prerequisites << endl << endl;
            break;
            // Exit the program
        case 9:
            // clean up the course list
            delete courseList;
            break;
            // Invalid menu option
        default:
            cout << choice << " is not a valid option." << endl << endl;
            break;
        }
    }

    cout << "Thank you for using the course planner!" << endl;

    return 0;
}
