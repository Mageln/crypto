import { Button, Drawer, Layout, Modal, Select, Space } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import { CoinInfoModal } from './CoinInfoModal';
import { AddAssetForm } from './AddAssetForm';

const headerStyle = {
    width: "100%",
    textAlign: 'center',
    height: 60,
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};


const AppHeader = () => {
    const { crypto } = useCrypto()
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const [ coin, setCoin] = useState(null)
   
    useEffect(() => {
        const keypress = event => {
            if (event.key === "/") {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener("keypress", keypress)
        return () => document.removeEventListener("keypress", keypress)
    }, [])
    const handleSelect = (value) => {
        setModal(true)
        setCoin(crypto.find((c) => c.id === value))
    }


    return (
        <Layout.Header style={headerStyle}>
            <Select
                open={select}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                value="press / to open"
                style={{ width: '250px' }}
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
            <Button onClick={() => setDrawer(true)} type="primary">Add Assets</Button>

            <Drawer width={600} title="Basic Drawer" onClose={() => setDrawer(false)} open={drawer}>
                <AddAssetForm/>
      </Drawer>
            <Modal
                open={modal}
                onCancel={() => setModal(false)}
                footer={null}
            >
                <CoinInfoModal coin={coin} />
            </Modal>
        </Layout.Header>
    )
}

export default AppHeader