import { Tab, Tabs, TabsHeader, Typography } from '@material-tailwind/react';

export const TabGameMode = ({ name, data, value, setValue, children }) => {
  const onClickHandle = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.getAttribute('data-name')]: e.target.getAttribute('data-value'),
    }));
  };

  return (
    <div>
      {children && <Typography variant={'lead'}>{children}</Typography>}
      <Tabs value={value}>
        <TabsHeader
          indicatorProps={{
            className:
              'rounded-md shadow-teal-500/40 !bg-teal-500 hover:bg-teal-700 hover:shadow-teal-700/40 text-white',
          }}>
          {data.map(({ label, value }) => (
            <Tab
              data-name={name}
              onClick={onClickHandle}
              activeClassName={'!text-white'}
              className={'text-black'}
              key={value}
              value={value}>
              <div data-name={name} data-value={value}>
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    </div>
  );
};
