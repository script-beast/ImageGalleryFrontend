import React from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'
import Fuse from 'fuse.js'
import ReactPaginate from 'react-pagination-library';
import "react-pagination-library/build/css/index.css";

export default function HomePage() {

    const [Imgs, setImgs] = React.useState([])
    const [pageNumer, setPageNumer] = React.useState(1)
    const [search, setSearch] = React.useState('')
    const [searchResult, setSearchResult] = React.useState([])

    const onsearch = () => {
        setSearch(search)
    }

    const onchange = (e) => {
        setSearch(e.target.value)
        searchData()
    }
    async function fthallimg() {
        const resImgs = await fetch('http://localhost:4001/')
        const dataImgs = await resImgs.json()
        setImgs(dataImgs)
        setSearchResult(dataImgs)
    }

    const searchData = () => {
        if (search === '') {
            setSearchResult(Imgs)
            return
        }

        const fuse = new Fuse(Imgs, {
            keys: ['ImgName'],
        });

        const result = fuse.search(search);
        const matchs = []
        if (!result.length)
            setSearchResult([])
        else {
            result.forEach(item => {
                matchs.push(item.item)
            })
            setSearchResult(matchs)
        }

    }
    
    const imgPerPage = 9
    const pageVisited = (pageNumer - 1) * imgPerPage

    const displayImgs = searchResult
        .slice(pageVisited, pageVisited + imgPerPage)
        .map(Img => {
            return (
                <div key={Img._id} className="news-card">
                    <img src={Img.ImgURL} alt="" className="news-card__image" />
                    <div className="news-card__text-wrapper">
                        <h2 className="news-card__title">{Img.ImgName}</h2>
                        <div className="news-card__details-wrapper">
                            <Link to={`/show/${Img._id}`} className="news-card__read-more">Read more <i className="fas fa-long-arrow-alt-right"></i></Link>
                        </div>
                    </div>
                </div>
            )
        })

    const changePage = (selected) => {
        setPageNumer(selected)
    }

    React.useEffect( () => {
        fthallimg()
    },[])

    React.useEffect( () => {
        searchData()
    },[search])

    return (
        <div className="home-page">
            <h1 className='text-center p-2 text-white'>Welcome to the Home Page</h1>
            <div onSubmit={onsearch} className="search-bar">
                <input type="search" name="search" pattern=".*\S.*" onChange={onchange} value={search} required />
                <button onClick={onsearch} className="search-btn" type="submit">
                    <span >Search</span>
                </button>
            </div>
            <br />
            <div className="content-wrapper">
                {displayImgs}
            </div>
            <br />
            <ReactPaginate
                totalPages={Math.ceil(searchResult.length / imgPerPage)}
                changeCurrentPage={changePage}
                currentPage={pageNumer}
            />
        </div>
    )
}
