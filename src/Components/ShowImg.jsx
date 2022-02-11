import React from 'react'
import './ShowImg.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function ShowImg() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [Imgs, setImgs] = React.useState([])

    async function fthallimg() {
        const resImgs = await fetch('https://mygalleryapi.herokuapp.com/show/' + id)
        const dataImgs = await resImgs.json()
        setImgs(dataImgs)
    }

    async function onDelImg() {
        try {
            const requestOptions = {
                method: 'DELETE',
            }
            const resImgs = await fetch('https://mygalleryapi.herokuapp.com/delete/' + id, requestOptions)
            const dataImgs = await resImgs.json()
            console.log(dataImgs)
            if (dataImgs) {
                window.alert('Deleted Successfully')
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        fthallimg()
    }, [])

    return (
        <div className='ShowImgBody'>
            <div>{Imgs.map(img => {
                return (
                    <figure key={img._id} className="image-block">
                        <h1>{img.ImgName}</h1>
                        <img src={img.ImgURL} alt="" />
                        <figcaption>
                            <h3>
                                More Info
                            </h3>
                            <p>{img.ImgDetails}</p>
                            <Link  to={`/edit/${img._id}`} type="button" className="btn btn-outline-warning">Edit <i className="fas fa-edit mx-2"></i></Link>
                            <button type="button" onClick={onDelImg} className="btn btn-outline-danger mx-4">Delete <i className="fas fa-trash-alt mx-2"></i></button>
                        </figcaption>
                    </figure>
                )
            })}</div>
        </div>
    )
}
