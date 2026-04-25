from trainer import trainer_main
import sys

if __name__ == "__main__":
    cfg = sys.argv[1]
    trainer_main(cfg, None)
