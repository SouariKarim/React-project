import React from 'react';
import './FreelanceLanguages.scss'
import {FreelanceSectionCard} from "../../FreelanceSectionCard/FreelanceSectionCard";


export default function FreelanceLanguages({freelance}) {

    const nbOfLanguages = freelance.languages.length

    return (
        <FreelanceSectionCard title={"Langues"}>
            {nbOfLanguages === 0 &&
                <p className={"empty-languages"}>
                    Jean-Michel.io n'a pas trouvé les langues maîtrisées par ce freelance sur le web.
                </p>
            }

            {nbOfLanguages !== 0 && freelance.languages.map((lang, index) =>
                <div key={index} className={"freelance-language"}
                     style={(index === nbOfLanguages - 1)? {border: 'none', padding: 0} : undefined}>

                    <p className={"lang"}>{lang.name}</p>
                    {lang.stringLevel &&
                        <p>{lang.stringLevel}</p>
                    }
                </div>
            )}
        </FreelanceSectionCard>
    )
}