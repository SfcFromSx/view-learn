const { Layout, Menu, Breadcrumb, Row, Col } = antd;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const {MenuUnfoldOutlined, MenuFoldOutlined} = icons;


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
        }
    }

    toggle = () => {
        console.log('toggle');
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

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
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" title="大屏设计">
                                <Menu.Item key="1">模板设计</Menu.Item>
                                <Menu.Item key="2">页面编排</Menu.Item>
                                <Menu.Item key="3">模块设计</Menu.Item>
                                <Menu.Item key="4">图表设计</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title="业务设计">
                                <Menu.Item key="5">DAG设计</Menu.Item>
                                <Menu.Item key="6">模型配置</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="sub4">系统配置</Menu.Item>
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