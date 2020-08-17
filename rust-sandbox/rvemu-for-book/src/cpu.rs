pub const MEMORY_SIZE: u64 = 1024 * 1024 * 128;

pub struct Cpu {
    pub regs: [u64; 32],
    pub pc: u64,
    pub memory: Vec<u8>,
}

impl Cpu {
    pub fn new(binary: Vec<u8>) -> Self {
        let mut regs = [0; 32];
        regs[2] = MEMORY_SIZE;

        Self {
            regs,
            pc: 0,
            memory: binary,
        }
    }

    fn read32(&self, addr: u64) -> u64 {
        let index = addr as usize;
        return (self.memory[index] as u32)
            | ((self.memory[index + 1] as u32) << 8)
            | ((self.memory[index + 2] as u32) << 16)
            | ((self.memory[index + 3] as u32) << 24);
    }


    pub fn fetch(&self) -> u32 {
        return self.read32(self.pc) as u32;
    }

    pub fn execute(&mut self, inst: u32) {
        // Decode an instruction and execute it.
        let opcode = inst & 0x0000007f;
        let rd = ((inst & 0x00000f80) >> 7) as usize;
        let rs1 = ((inst & 0x000f8000) >> 15) as usize;
        let rs2 = ((inst & 0x01f00000) >> 20) as usize;
        let funct3 = (inst & 0x00007000) >> 12;
        let funct7 = (inst & 0xfe000000) >> 25;

        self.regs[0] = 0;

        match opcode {
            0x13 => {
                // addi
                let imm = ((inst & 0xfff00000) as i32 as i64 >> 20) as u64;
                self.regs[rd] = self.regs[rs1].wrapping_add(imm);
            }
            0x33 => {
                // add
                self.regs[rd] = self.regs[rs1].wrapping_add(self.regs[rs2]);
            }
            _ => {
                dbg!("not implemented yet");
            }
        }
    }
}
