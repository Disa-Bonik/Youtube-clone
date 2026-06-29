import React from 'react';
import Button from './Button';

const ButtonList = () => {
  return (
    <div className="flex overflow-x-auto scrollbar-hide pt-1">
      <Button name="All"/>
      <Button name="Gaming"/>
      <Button name="Songs"/>
      <Button name="Live"/>
      <Button name="Scocer"/>
      <Button name="Cricket"/>
      <Button name="News"/>
      <Button name="Foods"/>
      <Button name="Vlogs"/>
      <Button name="Movies"/>
      <Button name="Podcasts"/>
      <Button name="Web series"/>
    </div>
  );
};

export default ButtonList;