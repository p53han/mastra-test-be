
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { customAgent } from './agents/custom-agent';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, customAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  server:{
    middleware: [{
      path: '/api/agents/*/stream',
      handler: async (c,next)=>{
      
        const body = await c.req.json();
    
        if ('state' in body && body.state == null) {
          delete body.state;
          delete body.tools;
        }
    
         c.req.json = async() => body;
    
        return next()
      }
    }]
   },
});
