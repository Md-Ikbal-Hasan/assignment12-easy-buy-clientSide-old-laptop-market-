import React from 'react';

const Blog = () => {
    return (
        <div className='m-5'>
            <h1 className="text-3xl font-bold text-center mb-5">This is Blog Page</h1>
            <div className='border w-full lg:w-2/3 mx-auto'>

                <div>
                    <p className='bg-gray-600 text-white p-4'>What are the different ways to manage a state in a React application?</p>
                    <div className='shadow-lg p-4'>
                        There are four main types of state you need to properly manage in your React apps:
                        <ul className='list-disc p-5'>
                            <li>   Local state. </li>
                            <li>     Global state. </li>
                            <li>   Server state.</li>
                            <li>   URL state. </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <p className='bg-gray-600 text-white p-4'>How does prototypical inheritance work</p>
                    <div className='shadow-lg p-4'> The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object</div>
                </div>

                <div>
                    <p className='bg-gray-600 text-white p-4'>What is a unit test? Why should we write unit tests?</p>
                    <div className='shadow-lg p-4'>
                        <p>A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system. In most programming languages, that is a function, a subroutine, a method or property. The isolated part of the definition is important.</p> <br />

                        <p>
                            For Test-Driven Development (TDD), you write unit tests before writing any implementation. This makes your implementation details in your code shorter and easier to understand. In this instance, the best time to write unit tests is immediately. For others, most developers write unit tests after the code's been written.
                        </p>
                    </div>
                </div>

                <div>
                    <p className='bg-gray-600 text-white p-4'>React vs. Angular vs. Vue?</p>
                    <div className='shadow-lg p-4'>

                        <p>One of the biggest of them is that React.js uses a virtual DOM that only compares the previous HTML code differences and only loads the different parts. This significantly impacts the loading times. In a positive way, of course.</p> <br />

                        <p> Angular.js is an MVC framework. A major disadvantage of Angular is that it uses a regular DOM, and thus, the entire tree structure of the HTML tags is updated, which massively impacts the loading time. Angular.js has its Ionic framework for mobile applications. </p> <br />

                        <p> Vue.js is a JavaScript-based progressive framework for creating single-page applications. It was created with scalability and incrementality in mind, as well as ease of integration with other view layer frameworks. </p> <br />

                    </div>
                </div>



            </div>
        </div>
    );
};

export default Blog;