import { Button,  DatePicker, Divider, Form,  InputNumber, Result, Select, Space } from "antd"
import { useRef, useState } from "react"
import { useCrypto } from "../context/crypto-context"
import { CoinInfo } from "./CoinInfo"

const validateMessages = {
    require: '${label} is require!',
    types: {
        number: '${label} is not valid number',

    },
    number:{
        range:"${label} must be between ${min} and ${max}"
    }
}

// eslint-disable-next-line react/prop-types
export const AddAssetForm = ({onClose}) => {
    const { crypto,addAsset } = useCrypto()
    const [coin, setCoin] = useState(null)
    const [form] = Form.useForm()
    const [sumbitted, setSumbitted] = useState(false)
    const assetRef =useRef()

    if (sumbitted) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>,
                   
                ]}
            />
        )
    }



    if (!coin) {
        return <Select
            onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
            placeholder="Select coin"
            style={{ width: '100%' }}
            options={crypto.map(coin => ({
                label: coin.name,
                value: coin.id,
                icon: coin.icon,
            }))}
            optionRender={(option) => (
                <Space>
                    <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
                </Space>
            )}
        />

    }

    const onFinish = (value) => {
        const newAsset = {
            id: coin.id,
            amount: value.amount,
            price: value.price,
            date: value.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        setSumbitted(true)
        addAsset(newAsset)
    }
    const handleAmountChange = (value) => {
        const price = form.getFieldValue("price")
        form.setFieldsValue({
            total: +(value * price).toFixed(2),
        })
    }
    const handlePriceChange = (value) => {
      const amount = form.getFieldValue("amount")
        form.setFieldsValue({
            total: +(amount * value).toFixed(2),
        })
    }

    return (
        <Form
        form={form}
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: +coin.price.toFixed(2)
            }}
            onFinish={onFinish}
            autoComplete="off"
            validateMessages={validateMessages}
        >
            <CoinInfo coin={coin} />
            <Divider />

            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    {
                        required: true,
                        type: "number",
                        min: 0,
                    },
                ]}
            >
                <InputNumber placeholder="Enter coin amount" 
                onChange={handleAmountChange}
                style={{width: "100%"}} />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
            >
                <InputNumber onChange={handlePriceChange} style={{width: "100%"}} />
            </Form.Item>


            <Form.Item
                label="Date & Time"
                name="date"
            >
               <DatePicker showTime/>
            </Form.Item>

            <Form.Item
                label="Total"
                name="total"
            >
                <InputNumber disabled style={{width: "100%"}} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                   Add Asset
                </Button>
            </Form.Item>
        </Form>

    )
}