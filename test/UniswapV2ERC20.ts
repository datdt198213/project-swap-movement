import {expect} from "chai";
import { ethers, Contract, Signer } from "ethers";
import hre from "hardhat";
import { UniswapV2ERC20__factory } from "../typechain-types";
import { describe } from "mocha";
import { TypedDataDomain, TypedDataField } from "@ethersproject/abstract-signer";
import * as dotenv from "dotenv";

dotenv.config();

describe("UniswapV2ERC20", function () {
    var uniswapV2ERC20: Contract;
    var deployer : Signer;
    var addr1: Signer;

    // This function will be executed before each test suit called 
    this.beforeEach(async function() {
        [deployer, addr1] = await hre.ethers.getSigners();
        const uniswapV2ERC20Contract = await hre.ethers.getContractFactory("TestUniswapV2ERC20", deployer)
        uniswapV2ERC20 = await uniswapV2ERC20Contract.deploy();
    })

    // Ham _mint them gia tri vao tong cung va so du cua dia chi duoc chi dinh
    describe("_mint", function(){
        it('Mint successfully!', async function () {
            const addr1Address = await addr1.getAddress();
            await uniswapV2ERC20.mintTokens(addr1Address, 100);

            expect(await uniswapV2ERC20.balanceOf(addr1Address)).to.equal(100);
            expect(await uniswapV2ERC20.totalSupply()).to.equal(100);
        });
    });

    // Ham _burn tru gia tri tu tong cung va so du cua dia chi duoc chi dinh.
    describe("_burn", function(){
        it('Burn successfully!', async function () {
            const addr1Address = await addr1.getAddress();
            await uniswapV2ERC20.mintTokens(addr1Address, 100);
            await uniswapV2ERC20.burnTokens(addr1Address, 50);

            expect(await uniswapV2ERC20.balanceOf(addr1Address)).to.equal(50);
            expect(await uniswapV2ERC20.totalSupply()).to.equal(50);
        });
    });

    // Ham _approve cho phep mot dia chi khac dc phep chuyen so tien cua ban
    describe("approve(address, uint)", async function () {
        it('Approve successfully!', async function () {
            const addr1Address = await addr1.getAddress();
            await uniswapV2ERC20.approve(addr1Address, 100);

            expect (await uniswapV2ERC20.allowance(await deployer.getAddress(), addr1Address)).to.equal(100);
        })
    });
    
    describe("transfer", function(){
        it("Transfer successfully!", async function(){
            const addr1Address = await addr1.getAddress();
            await uniswapV2ERC20.mintTokens(await deployer.getAddress(), 100);

            await uniswapV2ERC20.transfer(addr1Address, 50);
            expect(await uniswapV2ERC20.balanceOf(await deployer.getAddress())).to.equal(50);
            expect(await uniswapV2ERC20.balanceOf(addr1Address)).to.equal(50);
        });
    });

    describe("transferFrom", function () {
        it("Should transfer tokens using allowance", async function () {
            const addr1Address = await addr1.getAddress();
            await uniswapV2ERC20.mintTokens(await deployer.getAddress(), 100); // Mint 100 tokens to deployer
            await uniswapV2ERC20.approve(addr1Address, 50); // Approve addr1 to spend 50 tokens

            await uniswapV2ERC20.connect(addr1).transferFrom(await deployer.getAddress(), addr1Address, 50);
            expect(await uniswapV2ERC20.allowance(await deployer.getAddress(), addr1Address)).to.equal(0);
            expect(await uniswapV2ERC20.balanceOf(addr1Address)).to.equal(50);
        });
    });

    describe("permit", function () {
        it("Should approve via permit correctly", async function () {
            const owner = deployer;
            const spender = addr1;
            const value = 100;
            const deadline = Math.floor(Date.now() / 1000) + 60 * 60; // 1 giờ từ hiện tại
    
            const ownerAddress = await owner.getAddress();
            const spenderAddress = await spender.getAddress();
    
            // Lấy nonce từ contract
            const nonce = await uniswapV2ERC20.nonces(ownerAddress);
    
            // Tạo provider
            const provider = ethers.getDefaultProvider();
            const chainId = (await provider.getNetwork()).chainId;
    
            // Thiết lập DOMAIN_SEPARATOR và cấu trúc dữ liệu EIP-712
            const domain: TypedDataDomain = {
                name: "UniswapV2",
                version: "1",
                chainId: chainId,
                verifyingContract: uniswapV2ERC20.address
            };
    
            const types: Record<string, TypedDataField[]> = {
                Permit: [
                    { name: "owner", type: "address" },
                    { name: "spender", type: "address" },
                    { name: "value", type: "uint256" },
                    { name: "nonce", type: "uint256" },
                    { name: "deadline", type: "uint256" }
                ]
            };
    
            const message = {
                owner: ownerAddress,
                spender: spenderAddress,
                value: value,
                nonce: nonce.toString(),
                deadline: deadline
            };
    
            // Lấy trực tiếp private key từ biến môi trường mà không cần chỉnh sửa
            const ownerPrivateKey = process.env.OWNER_PRIVATE_KEY;
            if (!ownerPrivateKey) {
                throw new Error("Private key is not defined in environment variables");
            }
    
            // Tạo Wallet object
            const ownerWallet = new ethers.Wallet(ownerPrivateKey, provider);
    
            const signature = await ownerWallet.signTypedData(domain, types, message);
            if (!signature) {
                throw new Error("Signature is undefined");
            }
            const { v, r, s } = ethers.utils.splitSignature(signature);
    
            // Gọi hàm permit với chữ ký hợp lệ
            await uniswapV2ERC20.permit(ownerAddress, spenderAddress, value, deadline, v, r, s);    

            // Kiểm tra allowance
            expect(await uniswapV2ERC20.allowance(ownerAddress, spenderAddress)).to.equal(value);
        });
    });
});