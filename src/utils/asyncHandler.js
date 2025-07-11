//made method & then export it
// utility function to handle async errors in Express.js

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((Error) =>
      next(Error)
    );
  };
};

export { asyncHandler };

// another way to write asyncHandler is to use arrow function syntax
// Usage example:
// const asyncHandler = () => {}
// const asyncHandler = (fn) => {() => {}} just removed this curly braces
// const asyncHandler = (fn) => () => {}
// const asyncHandler = (fn) => async () => {}

// const asyncHandler = (fn) => async (req, res, next) => {
//     try{
//         await fn(req, res, next);
//         // if the function executes successfully, it will return the response
//         // if there is an error, it will be caught in the catch block
//         // and the error will be sent as a response

//     }catch(error){
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error",
//             error: error
//         })

//     }

// }
