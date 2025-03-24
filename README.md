## Getting Started

### First, run the development server:

```bash
npm run dev
```

### Second, Check the Network below the Local, (e.g. 192.168.x.x:3000)
```
 Next.js 15.2.1
   - Local:        http://localhost:3000
   - Network:      http://x.x.x.x:3000
   - Environments: .env.local
```

### Third, go to `.env.local and replace both variables with respective network:
```
# IP FOR FRONTEND
NEXT_PUBLIC_API_URL=http://x.x.x.x:3000

# IP FOR TEMPORARY SERVER
JSON_PUBLIC_API_URL=http://x.x.x.x:5001
```

### Lastly, Run the temporary backend server (db.json):

```bash
json-server --host 0.0.0.0 --port 5001 db.json
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result without server.
If you want with server, open with the current network url used. (e.g. 192.168.0.0:3000)

## Technologies 🛠
This project is built using:

### Frontend (NextJS)
- ReactJS - Frontend for Visualization and Interaction
- TailwindCSS - Framework for designing frontend

## Authors
- Mark Bandril
- Ayan Batulan
