PY=python

# Install Python dependencies (trainer) and frontend deps
install:
	$(PY) -m pip install -r trainer/requirements.txt
	cd frontend && npm install

# Run training with default config
train:
	$(PY) trainer/train.py configs/breakout_dqn.yaml

# Show saved models and logs
runs:
	@echo "Saved models:"
	@ls -lh models || echo "No models yet."
	@echo ""
	@echo "Training runs:"
	@ls -lh runs || echo "No runs yet."

# Launch TensorBoard to visualize logs
tb:
	tensorboard --logdir=runs --port=6006
