import "./layout.scss"
import PageWrapper from "./PageWrapper";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


export default function SiteLayout({ theme = "light", children }) {

    return (
        <main className={"site-layout theme-" + theme}>
            <Navbar theme={theme}/>
            <PageWrapper>{children}</PageWrapper>
            <Footer/>
        </main>
    )
}