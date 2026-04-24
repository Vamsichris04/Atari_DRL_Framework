# RL Studio
A 2025–26 Senior Design Project

- Vamsi Sudersanam (CS)
- Gavin Danner-Rivers (SE)
- Sukhbir Singh (CS)
- Ethan White (CS)
- Coltrane Bautch (CS)

Advisor: Robert Bardunias

## Repository Structure
### /.github
Contains a GitHub workflow that validates the frontend code

### /backend
Contains the backend API

### /drl-game
Contains the backend code used to train agents

### /frontend
Contains the code for the frontend

## First Time Set Up Instructions to Run the Application
1. Open a Powershell terminal from the project root
2. Run the following commands:
```shell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
3. The backend API should now be running
4. Open a separate Bash terminal from the project root
5. Run the following commands:
```bash
cd frontend
npm install -g pnpm
pnpm install
pnpm dev
```
6. The frontend should now be running
7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setting Up the Backend for Training

### Get started

1. *(Recommended)* Create and activate a clean environment (Python 3.10 or 3.11 works best with the current RL stack):
	```shell
	conda create --name atari-drl python=3.10
	conda activate atari-drl
	```
	If `conda` is missing, install Miniconda/Anaconda and add the launcher directory to `PATH`, e.g.:
	```
	C:\Users\<Username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Anaconda (anaconda3)
	```

2. Install training dependencies:
	```shell
	python -m pip install --upgrade pip
	python -m pip install -r drl-game/trainer/requirements.txt
	```

3. Download and license the Atari ROMs once:
	```shell
	python -m AutoROM --accept-license
	```

4. Kick off a training run:
	```shell
	python drl-game/trainer/trainer.py drl-game/configs/breakout_dqn.yaml
	```

TensorBoard logs will land in `drl-game/data/runs/<run_name>` and checkpoints in `drl-game/data/models/<run_name>`.


You can visualize the training using tensorboard which will be hosted locally on port 6006, below is th command (Path may be different, adjust per your absolute path):

tensorboard --logdir=drl-game/data/runs --port=6006 