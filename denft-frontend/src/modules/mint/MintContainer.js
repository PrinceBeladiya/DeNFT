import { ethers } from 'ethers';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import MainTemplateContainer from '../../shared/templates/MainTemplate/MainTemplateContainer';
import { DeNFTContract } from '../../utils/etherIndex';
import Mint from './Mint';
import { NFTStorage } from 'nft.storage';
import { API } from '../../API';

const MintContainer = () => {

    const [CurrentTokenID, setCurrentTokenID] = useState(0);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    const [files, setFiles] = useState([]);
    const [fileURI, setFileURI] = useState();

    const NFT_STORAGE_TOKEN = API;
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

    const mintNFT = async () => {
        setLoading(true);
        try {
            const { ethereum } = window;

            if (!ethereum) {
                toast.warning("Please first install metamask");
                return;
            }

            
            // await window.ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            let signer1 = provider.getSigner();
            
            console.log("ethereum - ", ethereum.selectedAddress);
            
            const uri = await imageUpload()
            if (uri !== 0) {
                await DeNFTContract.connect(signer1).functions.mintDeNFT(uri, { value: ethers.utils.parseEther("0.1") });
                
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                

                let mintTokenOwner = await DeNFTContract.functions.ownerOf(CurrentTokenID);

                if (toString(mintTokenOwner[0]) === toString(accounts[0])) {
                    setLoading(false);
                    toast.success("NFT with token id " + CurrentTokenID + " is minted for you", { autoClose: 2000 });
                } else {
                    setLoading(false);
                    toast.warning("NFT with token id " + CurrentTokenID + " is can not minted for you", { autoClose: 2000 });
                }
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("error => ", error.message);
        }
    }

    const imageUpload = async () => {
        if (image) {
            try {
                const imageFile = new File([image], 'nft.png', { type: 'image/png' })
                const metadata = await client.store({
                    name: 'NFT',
                    description: 'Just try to funge it. You can\'t do it.',
                    image: imageFile
                });

                console.log('NFT data stored!')
                console.log("storage - ", metadata);

                setFileURI(metadata.url);
                return metadata.url;
            } catch (error) {
                console.log("Error -> ", error);
                return 0;
            }
        } else {
            toast.warning("Please select image", { autoClose: 2000 });
            return 0;
        }

    }

    return (
        <MainTemplateContainer>
            <Mint
                mintNFT={mintNFT}
                CurrentTokenID={CurrentTokenID}
                setCurrentTokenID={setCurrentTokenID}
                loading={loading}
                setLoading={setLoading}
                setImage={setImage}
                files={files}
                setFiles={setFiles}
            />
        </MainTemplateContainer>
    )
}

export default MintContainer;