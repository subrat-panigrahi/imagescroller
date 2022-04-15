import './style.css';

export default function ImageContainer({url}){

    return (<div className='imageContainer'>
        <img className='productImage' src={url} alt='product_image'></img>
    </div>)

}