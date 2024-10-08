/* eslint-disable react/prop-types */
import { Divider,  Tag, Typography } from "antd"
import { CoinInfo } from "./CoinInfo"


export const CoinInfoModal = ({ coin }) => {

    return (
        <>

          <CoinInfo coin={coin} />
            <Divider />
            <Typography.Paragraph>
                <Typography.Text strong>
                    1 hour:
                </Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
                    {coin.priceChange1h}%
                </Tag>

                <Typography.Text strong>
                    1 day:
                </Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
                    {coin.priceChange1d}%
                </Tag>

                <Typography.Text strong>
                    1 week:
                </Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
                    {coin.priceChange1w}%
                </Tag>

            </Typography.Paragraph >
            {/*  */}




            {coin.price && <Typography.Paragraph>
                <Typography.Text strong>
                    Price:
                </Typography.Text>

                {coin.price.toFixed(2)}$
            </Typography.Paragraph >}

            {coin.priceBtc && <Typography.Paragraph>
                <Typography.Text strong>
                    Price BTC:
                </Typography.Text>

                {coin.priceBtc}
            </Typography.Paragraph >}

            {coin.marketCap && <Typography.Paragraph>
                <Typography.Text strong>
                    Market Cap:
                </Typography.Text>

                {coin.marketCap}$
            </Typography.Paragraph >}

           { coin.contractAddress && <Typography.Paragraph>
                <Typography.Text strong>
                    Contract Address:
                </Typography.Text>

                {coin.contractAddress}
            </Typography.Paragraph >}

           {coin.websiteUrl && <Typography.Paragraph>
                <Typography.Text strong>
                    Website :
                </Typography.Text>

               <a href={coin.websiteUrl}>{coin.websiteUrl}</a> 
            </Typography.Paragraph > }
        </>
    )

}