React is a free open source, java script library which makes our application more optmized there are few advantages we are having

1. Virtual DOM 
2. Components
3. COde reusability
4. East to understand if we are familiar with js
5. We can convert react applcation into production mode easily

Platform used for react is Nodejs and 
1. npx create-react-app <application-name>
2. By using vite we can ake our application more optmized
command:- npm create vite@latest

To execute a react application we need to create a project using vite command 
once the application was created we are going to install node modules which help us to run the application 

Types of components:--
we are having two types of components
1. Class 
2. Functional

By using hooks we can perform manipulations(operations) in function components

Hooks:-
1. useState ---> storing the data
2. useEffect --> performing actions before component load

In react whenever we create a component we need to import that component into App.jsx and access that component inside return div block
Always we have to carry a root div element for every component 

STORING DATA IN REACT:-
1. By using use state hook we are going to save the data 
        1. import useState from React package
        2. Create a variable using useState 
        3. To access the data use {} for the variable name 
        ex:--

        import React, {useState} from 'react'
        export default function Register(){
          const[name, setName] = useState("")
          const[age, setAge] = useState(19)
          return(
            <div>
                <input type="text" placeholder = "enter name " onChange={(e)=>{console.log(e.target)}}/>
            </div>
          )
        }


        NOTE:- here setName is the function used to update the data of name variable

        