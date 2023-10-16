import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import remarkGfm from 'remark-gfm' // 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from 'rehype-raw'
import 'github-markdown-css'
import { createStyles, makeStyles } from '@material-ui/core'
import { Box, Drawer, Grid } from '@material-ui/core'
import { Row, Col } from 'antd'
import '../css/navbar.css'

const useStyle = makeStyles((theme) =>
  createStyles({
    main: {
      flexGrow: 1,
      padding: theme.spacing(1),
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(7),
      minHeight: 'calc(100%-120px)',
    },
    drawer: {
      flexShrink: 0,
      width: 296,
      '& svg': {
        fontSize: '1.5rem',
      },
    },
    papper: {
      width: 296,
      overflowY: 'hidden',
    },
  })
)

function MarkDown({ url }) {
  const [mdContent, setMdContent] = useState('')
  const classes = useStyle()
  useEffect(() => {
    fetch('安装elasticsearch.md')
      .then((res) => res.text())
      .then((text) => setMdContent(text))
  })
  return (
    <>
      <div className='markdown_all'>
        <Row>
          <Col span={1}>
            <Drawer className={classes.drawer} variant={'permanent'} classes={{ papper: classes.papper }}>
              <Box>
                <MarkNav className='article' source={mdContent} headingTopOffset={40} ordered={false}></MarkNav>
              </Box>
            </Drawer>
          </Col>
          <Col span={23}>
            <main className={classes.main}>
              <Grid container justify='center' alignItems='center'>
                <Box width={'60%'}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} className={'markdown-body'}>
                    {mdContent}
                  </ReactMarkdown>
                </Box>
              </Grid>
            </main>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default MarkDown
