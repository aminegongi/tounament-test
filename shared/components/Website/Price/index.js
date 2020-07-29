import V1 from './PriceV1/PriceV1'

function Price(props) {

    return (
        <div id="prices">
            <V1 {...props} />
        </div>
    );
}
export default Price;