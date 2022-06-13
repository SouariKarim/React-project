import "./sections.scss"
import SecondaryTitle from "../../Titles/SecondaryTitle";
import Button from "../../Buttons/Button";
import SimpleSearchInput from "../../SimpleSearchInput/SimpleSearchInput";
import useRoutes from "../../../hooks/useRoutes";
import FreelanceShowCaseCarousel from "../../FreelanceShowCaseCarousel/FreelanceShowCaseCarousel";
import TextTitle from "../../Titles/TextTitle";


const POPULAR_QUERIES = [
    "Java", "DevOps", "React", "SAP", "PMO", "Cisco", "MOA"
]


export default function TrouvetouSection({ className = ''}) {

    const {redirect} = useRoutes();


    const submitSearch = ({query}) => {
        redirect({key: "SEARCH", queryParams: {query}});
    }


    return(
        <section className={"trouvetou " + className}>
            <SecondaryTitle title={"Jean-Michel TROUVETOU"}/>
            <TextTitle className={"text-center"} title={"Jean-Michel.io agrège tous les consultants indépendants dans l'IT"}/>

            <SimpleSearchInput onSubmitSearch={submitSearch}/>

            <p className={"popular-query"}>
                Recherches populaires : &nbsp;
                {POPULAR_QUERIES.map((query, key) =>
                    <span key={key}>
                        <Button variant={"link"} className="p-0 m-0" to={"SEARCH"} queryParams={{ query }}>{query}</Button>
                        {(key < POPULAR_QUERIES.length - 1) && ', '}
                    </span>
                )}
            </p>

            <FreelanceShowCaseCarousel/>
        </section>
    )
}