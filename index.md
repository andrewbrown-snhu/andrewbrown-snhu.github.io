## Table of Contents
1. <a href="#proSelf">Professional Self-Assessment</a>
2. <a href="#codeReview">Code Review</a>
3. <a href="#art1">Artifact 1 Enhancement - Software Design and Engineering</a>
4. <a href="#art2">Artifact 2 Enhancement - Algorithms and Data Structure</a>

<h2 id="proSelf">Professional Self-Assessment</h2>

<h2 id="codeReview">Code Review</h2>
<p>The code review covers the existing code for all three artifacts and the enhancements that will be completed for each one. The link below is a video which goes over the code in each artifact.</p>
<p><a href="https://youtu.be/UgWmZtTRz2I" target="_blank">Code Review</a></p>

<h2 id="art1">Artifact 1 Enhancement - Software Design and Engineering</h2>
The first artifact is the Treasure Hunt Game from the IT 140 class. The game consists of the user moving to different rooms to gather all the items to defect the zombie and was created in February of 2023. The artifact was selected to demonstrate successfully changing the programming language from Python to JavaScript and adding value by increasing the devices where the game can be implemented since JavaScript is integrated in many platforms including a web browser.

I demonstrated an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals by following industry-standard practices of structuring the code and providing comments throughout the code on the actions that will be taken. I also added comments for each function that explained the required inputs, and if the function returned a value, the comment explained what value would be returned when the function was called. Variable names were created that matched their purpose as far as the value they would hold. 

One of the first changes was moving global variables outside of the main method so they can be easily accessed in any of the functions that are called throughout the application. This helped removed unnecessary parameters from the functions since the global variables will no longer be required to be passed over.

Another change involved converting all language specific statements to the equivalent JavaScript language statements. This includes the “if” statements, arrays, loops, print statements, and code format. 

The last change that was required was retrieving input from the user. Javascript has a built-in module to achieve this, and once the module is imported, additional code is needed to set up a JavaScript promise and callback functions. Both the main and get_input methods are set up as blocking functions to prevent the application from going into an infinite loop. After this is in place, the application waits for the user to enter their next command and processes the command when the user presses enter. 

Any variable definitions that were intended to the used globally in the functions were moved outside of the main method so they can be accessed easily within any of the functions. This also removes passing global variables between functions.
One challenge I faced was re-learning how the code was set up originally. At first glance, I could figure out the main parts of the code and their actions, but some of the details required taking a closer look to gain a better understanding of the inner workings. This was especially important when converting the code to a different language. Another item that was learned was structuring the code in the way the language would normally have the code set up and using the correct built-in modules to receive user input. 

<h2 id="art2">Artifact 2 Enhancement - Algorithms and Data Structure</h2>
