import React from 'react';
import Content  from './components/Content';
import type { CoursePart } from './types';


const courseParts: CoursePart[] = [
  { name: 'Fundamentals', exerciseCount: 10, description: 'This is the basics' },
  { name: 'Advanced', exerciseCount: 7, description: 'More advanced stuff' },
  { name: 'Using props to pass data', exerciseCount: 14 },
];

const App: React.FC = () => {
  return (
    <div>
      <h1>Course Parts</h1>
      <Content parts={courseParts} />
    </div>
  );
};

export default App;
