# Andrew Brown ePortfolio
## Table of Contents
1. <a href="#proSelf">Professional Self-Assessment</a>
2. <a href="#codeReview">Code Review</a>
3. <a href="#art1">Artifact 1 Enhancement - Software Design and Engineering</a>
4. <a href="#art2">Artifact 2 Enhancement - Algorithms and Data Structure</a>
5. <a href="#art3">Artifact 3 Enhancement - Databases</a>

<h2 id="proSelf">Professional Self-Assessment</h2>

<h2 id="codeReview">Code Review</h2>
<p>The code review analyzes the code for all three artifacts by pointing out how the code works, how the code is structured, any issues in the code and then explains the enhancements that will be completed for each artifact. The link below is a video which goes over the code in each artifact.</p>
<p><a href="https://youtu.be/UgWmZtTRz2I" target="_blank">Watch the Code Review video</a></p>

<h2 id="art1">Artifact 1 Enhancement - Software Design and Engineering</h2>
The first artifact is the Treasure Hunt Game from the IT 140 class. The game consists of the user moving to different rooms to gather all the items to defect the zombie and was created in February of 2023. The artifact was selected to demonstrate successfully changing the programming language from Python to JavaScript and adding value by increasing the devices where the game can be implemented since JavaScript is integrated in many platforms including a web browser. 

I demonstrated an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals by following industry-standard practices of re-structuring the code in JavaScript and providing comments throughout the code on what actions the sections of code will complete. I also added comments for each function that explained the required inputs, and if the function returned a value, the comment explained what value would be returned when the function was called. 

One of the first changes was moving global variables outside of the main method so they can be easily accessed in any of the functions that are called throughout the application. This helped removed unnecessary parameters from the functions since the global variables will no longer be required to be passed over.

Another change involved converting all language-specific statements to the equivalent JavaScript language statements. This includes the “if” statements, arrays, loops, print statements, and code format. 

The last change that was required was retrieving input from the user. JavaScript has a built-in module to achieve this, and once the module is imported, additional code is needed to set up a JavaScript promise and callback functions. Both the main and get_input methods are set up as blocking functions to prevent the application from going into an infinite loop. After this is in place, the application waits for the user to enter their next command and runs the correct code based on the command entered.
Any variable definitions that were intended to be used globally in the functions were moved outside of the main method so they could be accessed easily within any of the functions. This also removes the requirement of passing global variables between functions.
One challenge I faced was re-learning how the code was set up originally. At first glance, I could figure out the main parts of the code and their actions, but some of the details required taking a closer look to gain a better understanding of the inner workings. This was especially important when converting the code to a different language. Another item that was learned was structuring the code in the way the language would normally have the code set up and using the correct built-in modules to receive user input.

**Artifact Code Links:**
- [Text Based Game - Original](https://github.com/andrewbrown-snhu/andrewbrown-snhu.github.io/blob/3de5d313d20340da9c74a247fd3d49724ee9d171/Artifact1/Original/TextBasedGame-original.py)
- [Text Based Game - Enhanced](https://github.com/andrewbrown-snhu/andrewbrown-snhu.github.io/blob/3de5d313d20340da9c74a247fd3d49724ee9d171/Artifact1/Enhanced/TextBasedGame-enhanced.js)


<h2 id="art2">Artifact 2 Enhancement - Algorithms and Data Structure</h2>
The artifact for category two is the course list program from the CS300 class. The program reads a comma delimited file that contains the course number, name and prerequisites. When the user requests the application to display the list of courses, it will sort the list and print out the results.

The reason the program was selected is that it uses a combination of data structures and algorithms to store the course list. The course list has a specific data structure to store the necessary data for each course, such as the course number, course name, and a list of the prerequisites. The course program also uses an algorithm to search for courses and to sort them in alphanumeric order by course number. In the current state, the sorting algorithm uses the built-in sorting that checks over the data as it is sorted, and for the dataset that is commonly used in the application, it will use the quicksort algorithm. 

I designed and evaluated computing solutions that solve a given problem using algorithmic principles and computer science practices and standards appropriate to its solution while managing the trade-offs involved in design choices by improving the sorting algorithm to use merge sort since the data set for the courses won’t be extremely large. After this change is made, the worst-case time complexity will improve from O(n2) to O(n*log(n)).

To implement the change in the code, I first needed to figure out how the merge sort algorithm works by looking at the pseudocode and then figuring out how to map it to the vector that was already created. The merge sort algorithm essentially creates temporary vectors and compares a defined key to add the courses to the temporary vector in sorted order. In the pseudocode below, the merge function gets the start, middle, and end indexes of the array and fills the two temporary arrays:

![Figure 1](https://andrewbrown-snhu.github.io/assets/images/figure-1.png)

The second important function is the mergeSort function, which recursively calls itself in addition to the merge function to temporarily create and move the values in the main array:

![Figure 2](https://andrewbrown-snhu.github.io/assets/images/figure-2.png)
 
The final code that is implemented in the C++ application is very similar to the pseudocode, with additional language-specific code added. In the CourseList class, the original courseSort method was removed and replaced with the two new methods set as private visibility:

![Figure 3](https://andrewbrown-snhu.github.io/assets/images/figure-3.png)
  
One additional method, called sortCourses, was added, which starts the sorting, and the coursesSorted property was added to keep track of whether the courses were already sorted by the algorithm. From here, the merge function was translated from the pseudocode to C++, and the identifier was also added during the comparison part of the algorithm:

![Figure 4](https://andrewbrown-snhu.github.io/assets/images/figure-4.png)

The mergeSort and sortCourses methods were added to handle the recursive calls and start the sorting:

![Figure 5](https://andrewbrown-snhu.github.io/assets/images/figure-5.png)

![Figure 6](https://andrewbrown-snhu.github.io/assets/images/figure-6.png)
 
To prevent the vector from being sorted multiple times when the course list is displayed, the application will check the coursesSorted variable and only sort the courses if the operation was not completed. This was implemented in the printCourses method: 

![Figure 7](https://andrewbrown-snhu.github.io/assets/images/figure-7.png)

The courseSorted variable is set to false whenever a new course is added to the list, such as when the comma-delimited file is loaded. 
I Designed, Developed, and Delivered professional-quality oral, written, and visual communications that are coherent, technically sound, and appropriately adapted to specific audiences and contexts by documenting the changes within the code using inline comments and a header comment along with defining the exact changes in the narrative.

I learned how different sort algorithms can be applied based on the data that needs to be sorted. There are cases where one algorithm is preferred over another based on how the data is structured and the size of the dataset. One challenge that I faced when changing the sort method was setting up the plan of how the pseudocode would be applied in the existing class and how it would successfully sort the vector. The pseudocode assumes that a simple array will be used for sorting, but the CourseList data structure is more complex than the simple array. After figuring out what identifier the algorithm uses to sort, the rest of the code was easy to apply. The other challenge was optimizing the code so as not to pass the array reference as a method parameter since this would be unnecessary with the CourseList class structure. As an industry standard, if a method is part of a class, then it should have visibility to other class members. Once the changes were made, additional testing and debugging were completed to ensure the application worked as expected.

**Artifact Code Links:**
- [CourseList - Original](https://github.com/andrewbrown-snhu/andrewbrown-snhu.github.io/tree/3de5d313d20340da9c74a247fd3d49724ee9d171/Artifact2/Original) | [[Download Zip]](https://andrewbrown-snhu.github.io/Artifact2/Original/Artifact%202%20-%20original.zip)
- [CourseList - Enhanced](https://github.com/andrewbrown-snhu/andrewbrown-snhu.github.io/tree/3de5d313d20340da9c74a247fd3d49724ee9d171/Artifact2/Enhanced) | [[Download ZIP]](https://andrewbrown-snhu.github.io/Artifact2/Enhanced/%20Artifact%202%20-%20enhanced.zip)

<h2 id="art3">Artifact 3 Enhancement - Databases</h2>
The artifact for category three is from the CS465 course which is full stack application to manage the Travlr website. The artifact contains a back-end server to handle API calls for the user to login as well as add and edit trip data. For the front-end side, an administration section built using Angular allow a user to log in and add additional trips or make changes to the existing trips. 

The artifact was selected since it can demonstrate two of the course outcomes related to security and allowing multiple users in an organization to collaborate with the trips that are displayed to a consumer. Before the enhancements were made to the artifact, a user could register an account without being logged in first, which is a security risk, and this would give them unrestricted access to modify or add new trips to the website. Another issue with the current state of the artifact is a user has no way to update their password or profile information. The artifact was enhanced by adding a profile page for the user to update their account information and password. Another page was added to accept new registrations, which requires the user to be logged in first. In the code files, a changelog file was added to show each change that was made in the project.

I employed strategies for building collaborative environments that enable diverse audiences to support organizational decision-making in the field of computer science by adding a profile section for the user to make updates to their password or account information. The user can also register new accounts in case another user needs access to edit or add trips to the website. 

Angular uses components for both page displays and separate sections within the page. To create the profile section, a new component was created in the project using the built-in Angular command "ng generate component account" and Angular-cli then adds the boiler-plate files for the component. The component is added to the route list so it can be accessed in the browser. The component has a new form added to it along with all methods to handle the actions within in the form such as submitting and displaying form errors. 

The front-end portion for updating the account information is mostly complete, but the back-end would need to be modified to accept the API requests from the front-end. In the controller for authentication, an additional method was added to accept and validate the profile form data and update the database accordingly. Once the API requests are created, the front-end application can be modified to send the form data to the back-end server. The standard practice for sending data to an API in Angular is to use a service that is injected into the component. The project already had a service setup, so the only change needed was to add the additional code for sending the request to the back-end API. 

The process for creating the page to handle new user registration was almost the same as creating the page to update the profile. A new component was created, added to the route list, and an identical form code was placed in the new component. The back-end already had code written to handle new user registration, and the service in Angular had un-used code for sending the form data to the API leaving the only change to inject the service in the component to complete the process.

I developed a security mindset that anticipates adversarial exploits in software architecture and designs to expose potential vulnerabilities, mitigate design flaws, and ensure privacy and enhanced security of data and resources by implementing security controls to prevent other users or guests from modifying another user's profile information. The same security control is added to prevent a guest user from creating new accounts. For both cases, the user is now required to be logged in with a security token that is generated from the server. If the user is not logged in, they will now get an error if they try to register a new account or update their profile information.

When adding the enhancements to the artifact, there were a few discoveries. The first one is figuring out how the authentication service handles reading the token so it can keep track of which user is making the request. Once that is figured out, the enhancement of updating the profile information can be added. The second discovery was making sure the mongoose driver was updating the correct record. At first, the record would appear to be updated, but it wasn't taking the correct input for the user that was logged in, and this would create a security issue. After revising the code to only use the ID from the user's token, the security bug was fixed, and the correct record was updated.

**Artifact Code Links:**
- [Travlr Admin Panel - Original](https://github.com/andrewbrown-snhu/andrewbrown-snhu.github.io/tree/ad53a56c997aed26ea754f9be3e0eac01eaee4c3/Artifact3/Original) | [[Download Zip]](https://andrewbrown-snhu.github.io/Artifact3/Original/Artifact%203%20-%20original.zip)
- [Travlr Admin Panel - Enhanced](https://github.com/andrewbrown-snhu/andrewbrown-snhu.github.io/tree/ad53a56c997aed26ea754f9be3e0eac01eaee4c3/Artifact3/Enhanced) | [[Download ZIP]](https://andrewbrown-snhu.github.io/Artifact3/Enhanced/Artifact%203%20-%20enhanced.zip)
