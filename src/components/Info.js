import React from 'react';
import '../styles/info.styles.scss';

function Info() {
  return (
    <div className="container w-100 mt-4 pt-1 info__outer">
      <h2 className="text-center fw-bold info__header">
        Why&nbsp;
        <span className="info__span">Mushroom Edibility Prediction </span>
        Matters
      </h2>
      <p className="mt-4 pt-1 info__text">
        Mushroom edibility prediction ensures safety and supports sustainable
        practices. Rich in nutrients and vital for ecosystems, mushrooms can be
        challenging to classify due to similarities between edible and poisonous
        types. Using image recognition and data analysis, a mushroom edibility
        prediction model quickly and accurately identifies mushrooms, aiding
        farmers, foragers, and mycologists. This tool reduces risks, promotes
        safe harvesting, and enhances research, fostering sustainability and
        efficient resource use.
      </p>
    </div>
  );
}

export default Info;
