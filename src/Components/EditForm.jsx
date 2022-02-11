import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditForm() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [Img, setImg] = React.useState({})

    function onChange(event) {
        const { name, value } = event.target;

        setImg((prevdata) => {
            return {
                ...prevdata,
                [name]: value
            };
        });
    }

    async function fthallimg() {
        const resImgs = await fetch('http://localhost:4001/update/' + id)
        const dataImgs = await resImgs.json()
        setImg(dataImgs)
    }

    const onSubmitImg = async (event) => {
        event.preventDefault();
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Img)
            }
            const response = await fetch('http://localhost:4001/edit/' + id, requestOptions);
            const data = await response.json();
            if (data) {
                navigate('/')
                window.alert('Image Updated')
            }
        } catch (error) {
            console.log(error.message);
            window.alert('Image not Added. Please Check Console')
        }
    }

    React.useEffect(() => {
        fthallimg()
    }, [])

    return (
        <div className='NewFormContainer'>
            <div className="form" key={Img._id}>
                <div className="title">Add Image</div>
                <div className="subtitle">Fill the details !</div>
                <div className="input-container ic1">
                    <input id="ImgName" className="input" type="text" name="ImgName" placeholder=" " value={Img.ImgName} disabled />
                    <div className="cut"></div>
                    <label htmlFor="ImgName" className="labplaceholder">Image Name</label>
                </div>
                <div className="input-container ic2">
                    <input id="ImgURL" className="input" type="text" name="ImgURL" placeholder=" " onChange={onChange} value={Img.ImgURL} />
                    <div className="cut"></div>
                    <label htmlFor="ImgURL" className="labplaceholder">Image URL</label>
                </div>
                <div className="input-container ic2">
                    <input id="ImgDetails" className="input" type="text" name="ImgDetails" placeholder=" " onChange={onChange} value={Img.ImgDetails} />
                    <div className="cut cut-short"></div>
                    <label htmlFor="ImgDetails" className="labplaceholder">Details</label>
                </div>
                <button type="text" onClick={onSubmitImg} className="submit">Update</button>
            </div>
        </div>
    )
}
