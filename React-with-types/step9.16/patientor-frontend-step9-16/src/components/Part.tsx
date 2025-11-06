import React from 'react';
import type { CoursePart } from "../types";
interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  return (
    <p>
      {part.name} - {part.exerciseCount} {part.description && `: ${part.description}`}
    </p>
  );
};

export default Part;
