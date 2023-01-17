import React from "react";

type Props = {};

export const RecipeCart = (props: Props) => {
  return (
    <div className="recipe-container">
      <div className="top-section">
        <div className="nav">
          <div className="logo-sm">
            <img
              src="../public/logo_pur.png"
              alt=""
              style={{ height: "74px" }}
            />
          </div>
          <button>Powrót</button>
        </div>
      </div>

      <div className="recipe-body">
        <div className="recipe-title">
          <h1>Szparagi zapiekane z szynką schwarzwaldzką</h1>
        </div>
        <div className="mid-section">
          <div className="ingredient-list">
            <h2>Składniki:</h2>
            <ul>
              <li>
                <p>marchewka</p>
                <span>1 sztuka</span>
              </li>
              <li>słonecznik</li>
              <li>sałata</li>
              <li>ogórek</li>
              <li>pieprz</li>
              <li>sól</li>
            </ul>
          </div>
          <div className="recipe-photo">
            <img
              src="../public/amerykanskie-nalesniki-pancakes.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="bottom-section">
          <div className="instruction">
            <h2>Sposób przygotowania:</h2>
              <p>
                Wytrybuj kości z kurczaka, oprósz je obficie przyprawą do girosa
                upiecz w nagrzanym do 190*C przez około 50 minut po tym czasie
                mięso pokrój w paseczki.
              </p>
            <p>
              Majonez wymieszaj z jogurtem, posiekaną kolendrą oraz roztartym na
              miazgę czosnkiem, pastą z chili , kminem rzymskim dopraw do smaku
              kilkoma kroplami soku z cytryny, oraz jeśli uznasz to za
              konieczne, szczyptą soli.
            </p>
            <p>
              Pomidory cebulę i sałatę pokrój w cienkie plastry wymieszaj z
              Przyprawą Za'atar Knorr.
            </p>
            <p>
              Ciepłe kawałki mięsa nałóż na placek, dodaj sałatkę i polej
              obficie sosem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
