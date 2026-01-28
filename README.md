# BeliefChangeSimulator

🌐 **Live Demo:** https://beliefchangesimulator.pages.dev/

An interactive web application that simulates belief changes in social networks. Explore how conspiracy theory beliefs spread and change through exposure and social influence across different scenarios in Japan and the United States.

## Features

- **Multiple Scenarios**: Choose from 11 different conspiracy theory scenarios
- **Country Comparison**: Compare belief dynamics between Japan (JP) and the United States (US)
- **Intervention Simulation**: Test the effects of interventions at different stages (early/middle/late) with varying degrees of influence
- **Network Visualization**: Visualize belief changes across social network nodes over time
- **Interactive Dashboard**: Real-time simulation with customizable parameters

## Technologies

- **Frontend**: Vue 3 + Vite
- **Visualization**: D3.js for network graphs
- **Backend**: Python (simulation engine - not included in deployment)
- **Deployment**: Cloudflare Pages

## Project Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Production Build

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Project Structure

- `/src` - Vue.js application source code
- `/public/metadata` - Simulation metadata and scenario data (JSON files)
- `/backend` - Python simulation engine (not deployed to web)

## License

This project is for research and educational purposes.
