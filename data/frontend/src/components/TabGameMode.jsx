import { Tab, Tabs, TabsHeader, Typography } from '@material-tailwind/react';

export const TabGameMode = ({ data, value, setValue, children }) => {
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
              activeClassName={'!text-white'}
              className={'text-black'}
              onClick={() => setValue(value)}
              key={value}
              value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    </div>
  );
};
