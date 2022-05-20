import React, { useEffect, useState } from 'react';
import MainTemplateContainer from '../../shared/templates/MainTemplate/MainTemplateContainer';
import HomeContainer from './home/HomeContainer';
import BorrowContainer from './borrow/BorrowContainer';

const MarketplaceContainer = () => {
    
    const menuItems = [
        {
            title: 'Home',
            key: 'home',
            component : <HomeContainer/>
        },
        {
            title: 'Borrow',
            key: 'borrow',
            component : <BorrowContainer/>
        },
    ]
    const [selectMenuItem, setSelectMenuItem] = useState(menuItems[0].key);

    const onMenuClick = (key = menuItems[0].key) => {
        setSelectMenuItem(key);
    }


    return (
        <MainTemplateContainer>
            <div className="marketplace-container">

                <div className="menu-items">
                    {
                        menuItems.map(menuItem => (
                            <div
                                className={`menu-item ${menuItem.key === selectMenuItem && "active"}`}
                                key={menuItem.key}
                                role="presentation"
                                onClick={() => onMenuClick(menuItem.key)}
                            >
                                {menuItem.title}
                            </div>
                        ))
                    }
                </div>
                <div className="main-marketplace-container">
                {
                    menuItems.map(menuItem => (
                        selectMenuItem === menuItem.key && menuItem.component
                    ))
                }
                </div>
            </div>
        </MainTemplateContainer>
    )
}

export default MarketplaceContainer