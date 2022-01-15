import React from "react";

export default function Tooltip({ feature }) {
  const { title, type, author, director, artist, album, editor, year, place } =
    feature.properties || {};

  return (
    <div id={feature.id}>
      <h3>{title}</h3>
      <p>{type}</p>
      <p>{author || director}</p>
      <p>{editor}</p>
      <p>{year}</p>
      <p>{place}</p>
    </div>
  );
}
