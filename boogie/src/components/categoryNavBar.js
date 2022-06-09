// import { useState } from "react";
// const quotes = [
//     {
//         quote:
//             "One of my most productive days was throwing away 1,000 lines of code."
//     },
//     {
//         quote:
//             "I have always wished for my computer to be as easy to use as my telephone; my wish has come true because I can no longer figure out how to use my telephone."
//
//     },
//     {
//         quote: "When in doubt, use brute force."
//     },
//     {
//         quote: "Talk is cheap. Show me the code."
//     },
//     {
//         quote:
//             "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live."
//
//     },
//     {
//         quote:
//             "Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program."
//     },
//     {
//         quote:
//             "Most software today is very much like an Egyptian pyramid with millions of bricks piled on top of each other, with no structural integrity, but just done by brute force and thousands of slaves."
//     },
//     {
//         quote:
//             "Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris"
//     },
//     {
//         quote:
//             "First learn computer science and all the theory. Next develop a programming style. Then forget all that and just hack."
//     }
// ];
// export default function RandomPhrases() {
//     const [index, setIndex] = useState();
//     const generate = () => {
//         const index = Math.floor(Math.random() * quotes.length);
//         setIndex(index);
//     };
//     return (
//         <div className="App">
//             <button onClick={generate}>generate</button>
//             <p>{quotes[index] && quotes[index].quote}</p>
//         </div>
//     );
// }
