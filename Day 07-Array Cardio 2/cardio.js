// ## Array Cardio Day 2

const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
  ];

  const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
  ];

  // Some and Every Checks
  // is at least one person 19 or older?
  // Array.prototype.some() 
  const isAdult = people.some(function(person){
    const currentYear = (new Date()).getFullYear();
    if(currentYear - person.year >= 19) {
      return true;
    }
  });
  // is everyone 19 or older?
  // Array.prototype.every() 
  const allAdults = people.every(function(person){
    const currentYear = (new Date()).getFullYear();
    if(currentYear - person.year >= 19) {
      return true;
    }
  });
 
  // console.log({allAdults});

  // Find is like filter, but instead returns just the one you are looking for
  // find the comment with the ID of 823423
  // Array.prototype.find()
  const comment = comments.find(function() {
    if(comment.id === 823423) {
      return true;
    }
  });
  
  // Find the comment with this ID
  // Array.prototype.findIndex()
  const index = comments.findIndex(function() {
    if(comment.id === 823423) {
      return true;
    }
  })
  // delete the comment with the ID of 823423

  // comments.splice(index, 1); 
  // OR
  // make a new array without it

  const newComments = [
    ...comments.slice(0, index),
    ...comments.slice(index + 1)
  ];
