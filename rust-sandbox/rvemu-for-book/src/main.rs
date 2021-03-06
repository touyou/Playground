use std::env;
use std::fs::File;
use std::io;
use std::io::prelude::*;

mod cpu;
use crate::cpu::*;

fn main() -> io::Result<()> {
    let args: Vec<String> = env::args().collect();

    if args.len() != 2 {
        panic!("Usage: rvemu-simple <filename>");
    }
    let mut file = File::open($args[1])?;
    let mut binary = Vec::new();
    file.read_to_end(&mut binary)?;

    let mut cpu = Cpu::new(binary);

    while cpu.pc < cpu.memory.len() as u64 {
        // 1. Fetch.
        let inst = cpu.fetch();
        // 2. Add 4 to the program counter.
        cpu.pc = cpu.pc + 4;
        // 3. Decode
        // 4. Execute.
        match cpu.execute(inst) {
            true => break,
            false => {}
        };

        if cpu.pc == 0 {
            break;
        }
    }
}


