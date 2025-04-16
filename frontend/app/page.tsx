

export default function Home() {
  const forumList = [
    {title: 'forum1', desc: 'this is forum1'},
    {title: 'forum2', desc: 'this is forum2'},
    {title: 'forum3', desc: 'this is forum3'}
  ]
  return (
    <div style={{marginTop: '20px', marginLeft: '20px'}}>
      {forumList.map((item) => {
        return (
          <div key={item?.title} style={{border: '2px solid black', borderRadius: '4px', padding: '2px', marginTop: '10px', width: 200}}>
            {item?.title}
          </div>
        )
      })}
    </div>
  );
}
