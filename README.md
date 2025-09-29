# Atari_DRL_Framework

## Get started

1. *(Recommended)* Create and activate a clean environment (Python 3.10 or 3.11 works best with the current RL stack):
	```powershell
	conda create --name atari-drl python=3.10
	conda activate atari-drl
	```
	If `conda` is missing, install Miniconda/Anaconda and add the launcher directory to `PATH`, e.g.:
	```
	C:\Users\<Username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Anaconda (anaconda3)
	```

2. Install training dependencies:
	```powershell
	python -m pip install --upgrade pip
	python -m pip install -r drl-game/trainer/requirements.txt
	```

3. Download and license the Atari ROMs once:
	```powershell
	python -m AutoROM --accept-license
	```

4. Kick off a training run:
	```powershell
	python drl-game/trainer/trainer.py drl-game/configs/breakout_dqn.yaml
	```

TensorBoard logs will land in `drl-game/runs/<run_name>` and checkpoints in `drl-game/models/<run_name>`.
