//Task()
//The task() method is the basic wrapper for which we create our tasks. Its syntax is .task(string, function). 
//It takes two arguments: a string value representing the name of the task and a function that will contain 
//the code you wish to execute upon running that task

//Src()
//The src() method is our input, or how we gain access to the source files that we plan on modifying.
//It accepts either a single string or an array of strings as an argument. The syntax is .src(string || array).

//Dest()
//The dest() method is used to set the output destination of your processed file.
//Most often, this will be used to output our data into a build or dist folder that will
//be either shared as a library or accessed by your application. The syntax for this method is .dest(string).

//Pipe()
//The pipe() method will allow us to pipe together smaller single-purpose plugins or applications into a pipechain. 
//This is what gives us fullcontrol of the order in which we would need to process our files. 
//The syntax for this method is .pipe(function).

//parallel() series()
//The parallel() and series() methods were added in version 4.0 as a way to easily control whether your tasks are ran together
//- all at once, or in a sequence - one after the other.
//This is important if one of your tasks requires that other tasks complete before it can be ran successfully.
