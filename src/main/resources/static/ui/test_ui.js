const { Layout, Menu, Breadcrumb, Row, Col } = antd;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const {MenuUnfoldOutlined, MenuFoldOutlined} = icons;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            currentPage:'page1',
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    renderContent = (page) => {
        const Page = pages[page];
        return <Page/>
    }

    clickMenuItem = (param) => {
        this.setState({
            currentPage:param.key,
        });
    }

    render() {
        return (
            <Layout>
                <Header style={{padding:0}} className="header">
                    <div style={{width: 200, height: '100%', textAlign:'center', float:'left'}}>
                        <a id="logo">
                            <img alt="logo" width={25} height={25} style={{marginRight:8}} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
                            <span style={{color:'white', fontSize:16}}> Vision Platform </span>
                        </a>
                        {/*<h1 style={{color:'white', fontSize:24, textAlign:'center'}}>管控平台</h1>*/}
                    </div>
                    <div style={{float:'left'}}>
                        {
                            this.state.collapsed ?
                            <MenuUnfoldOutlined className="trigger" style={{color:'white'}} onClick={this.toggle}/> :
                            <MenuFoldOutlined className="trigger" style={{color:'white'}} onClick={this.toggle}/>
                        }
                    </div>
                </Header>
                <Layout>
                    <Sider className="site-layout-background" trigger={null} collapsible collapsed={this.state.collapsed}>
                        <Menu
                            onClick={this.clickMenuItem}
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" title="大屏设计">
                                <Menu.Item key="page1">模板设计</Menu.Item>
                                <Menu.Item key="page2">页面编排</Menu.Item>
                                <Menu.Item key="page3">模块设计</Menu.Item>
                                <Menu.Item key="page4">图表设计</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title="业务设计">
                                <Menu.Item key="page5">DAG设计</Menu.Item>
                                <Menu.Item key="page6">模型配置</Menu.Item>
                                <Menu.Item key="page7">option7</Menu.Item>
                                <Menu.Item key="page8">option8</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="page9">系统配置</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 800,
                            }}
                        >
                        {
                            this.renderContent(this.state.currentPage)
                        }
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
};
ReactDOM.render(
    <App />,
    document.querySelector("#root")
);